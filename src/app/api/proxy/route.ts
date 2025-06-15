
// /Users/berkay/Documents/projects/web/hexaapps.net/src/app/api/proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Helper function to process the proxy request
async function proxyToExternalApi(request: NextRequest) {
  let targetUrl: string;

  try {
    // Attempt to parse the request body to get the targetUrl
    // Note: GET requests with bodies are unconventional but technically possible.
    // The client must send a JSON body: { "targetUrl": "your_desired_url" }
    const body = await request.json();
    if (!body.targetUrl || typeof body.targetUrl !== 'string' || body.targetUrl.trim() === '') {
      return NextResponse.json(
        { message: 'Missing or invalid "targetUrl" in request body. It must be a non-empty string.' },
        { status: 400 }
      );
    }
    targetUrl = body.targetUrl;

    // Basic URL validation
    try {
      new URL(targetUrl); // This will throw an error if the URL is invalid
    } catch (_) {
      return NextResponse.json(
        { message: 'Invalid "targetUrl" format. It must be a valid URL.' },
        { status: 400 }
      );
    }

  } catch (error) {
    // This error occurs if request.json() fails (e.g., no body, malformed JSON)
    return NextResponse.json(
      { message: 'Invalid request: body must be JSON and include a "targetUrl" string field.' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.EXTERNAL_API_KEY;
    const headers: HeadersInit = {};

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    } else {
      // Log a warning if the API key is missing, as it might be crucial for the external API
      console.warn('EXTERNAL_API_KEY is not set. The proxy request to the external API will be made without an Authorization header.');
      // Depending on requirements, you might want to return an error if the key is mandatory:
      // return NextResponse.json({ message: 'Proxy configuration error: API key for external service is missing.' }, { status: 500 });
    }

    // Make a GET request to the external API
    const apiRes = await fetch(targetUrl, {
      method: 'GET', // The proxy always makes a GET request to the targetUrl
      headers: headers,
      // cache: 'no-store', // Uncomment if you want to ensure fresh data for every request
    });

    // If the response from the external API is not successful, forward the error
    if (!apiRes.ok) {
      let errorDetails = `External API responded with status ${apiRes.status}`;
      try {
        const errorBody = await apiRes.json();
        // Use a more specific error message if available from the external API
        errorDetails = (errorBody && typeof errorBody.message === 'string') ? errorBody.message : JSON.stringify(errorBody);
      } catch (e) {
        // If parsing error body fails, use the status text or a generic message
        errorDetails = apiRes.statusText || `External API error occurred with status ${apiRes.status}`;
      }
      return NextResponse.json(
        { message: 'External API responded with an error', details: errorDetails },
        { status: apiRes.status } // Propagate the status from the external API
      );
    }

    // Get the successful response and return it as JSON to the client
    const data = await apiRes.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Proxy Error:', error);
    // Handle fetch-specific errors (e.g., network error, invalid URL that passed basic check)
    if (error instanceof TypeError || (error.cause && typeof error.cause === 'object')) {
        const causeMessage = error.cause ? ` (Cause: ${String(error.cause)})` : '';
        return NextResponse.json(
            { message: `Failed to connect to the target URL: ${targetUrl}. Error: ${error.message}${causeMessage}` },
            { status: 502 } // 502 Bad Gateway is appropriate for proxy errors connecting to upstream
        );
    }
    return NextResponse.json(
      { message: 'An internal server error occurred in the proxy.' },
      { status: 500 }
    );
  }
}

// To handle GET requests
export async function GET(request: NextRequest) {
  // The target URL is expected in the request body, even for GET.
  return proxyToExternalApi(request);
}

// To handle POST requests
export async function POST(request: NextRequest) {
  // The target URL is expected in the request body.
  // The proxy will then make a GET request to that targetUrl.
  return proxyToExternalApi(request);
}
