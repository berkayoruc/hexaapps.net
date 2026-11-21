import React from "react";
import ReactMarkdown from "react-markdown";
import "../style.css";
import { pageMetadata } from "../../../lib/seo";

export const metadata = pageMetadata({
  title: "Blurry Terms and Conditions",
  description: "Terms and conditions for using Blurry, the AI text blurring app by Hexa Apps.",
  path: "/apps/blurry/terms",
});

const TermsPage = () => {
  const termsContent = `
# Terms and Conditions  

**Effective Date:** 21.11.2024

## 1. Introduction  
Welcome to **Blurry**! These Terms and Conditions govern your use of the application ("App"), available on iOS, and any related services provided. By accessing or using the App, you agree to be bound by these Terms.  

## 2. Use of the App  
- **Purpose**: The App allows blur any text on images. All process handle locally.  
- **Account Creation**: Users are not required to create an account to use the App. All data is stored locally on your device.  
- **Eligibility**: There is no age restriction for using the App.  
- **User Responsibility**: You are responsible for ensuring the accuracy and privacy of the data you save in the App.  

## 3. Subscriptions and In-App Purchases  
- The App offers **$3.99, monthly $12.99, and annually $49.99 subscriptions** that provide ad-free access and premium features.  
- Payments are charged to your Apple ID account at confirmation of purchase.  
- Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. You can manage subscriptions in your account settings.  
- **Refunds**: All purchases are final and non-refundable, except as required by applicable law.  

## 4. Advertising  
- The free version of the App contains advertisements through AdMob. Subscribing removes all ads from the App.  

## 5. Data Collection and Privacy  
- **Data Storage**: All data saved in the App is stored locally on your device.  
- **Third-Party Services**: The App integrates Firebase Analytics and AdMob anonymously to improve user experience and display relevant ads. No personally identifiable information is collected.  
- For more details, please refer to our [Privacy Policy](https://hexaapps.net/apps/blurry/privacy).  

## 6. Intellectual Property  
All content, trademarks, and other intellectual property in the App are owned by Hexaapps and are protected under applicable Turkish laws and international agreements.  

## 7. Limitation of Liability  
The App is provided on an "as-is" basis. We do not guarantee uninterrupted or error-free service. We are not liable for any damages resulting from your use of the App.  

## 8. Termination  
We reserve the right to suspend or terminate your access to the App at any time for violations of these Terms.  

## 9. Changes to Terms  
We may update these Terms from time to time. Continued use of the App constitutes acceptance of the revised Terms.  

## 10. Governing Law  
These Terms are governed by and construed in accordance with the laws of the Republic of Turkey.  

## 11. Contact Us  
If you have any questions about these Terms, please contact us at hexagameapps@gmail.com.  
  `;

  return (
    <div className="terms-container">
      <ReactMarkdown>{termsContent}</ReactMarkdown>
    </div>
  );
};

export default TermsPage;
