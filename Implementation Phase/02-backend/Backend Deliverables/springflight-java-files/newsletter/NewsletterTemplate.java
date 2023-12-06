package com.ensf614.springflight.newsletter;

import org.springframework.stereotype.Component;

@Component
public class NewsletterTemplate {

    public String generatePromotion() {
        String companyName = "SkyByte Airlines";

        StringBuilder newsletterContent = new StringBuilder();
        newsletterContent.append("Dear Valued Customer,\n\n");
        newsletterContent.append("We're excited to present exclusive offers from " + companyName + " for you!\n\n");
        newsletterContent.append("Enjoy amazing discounts on select destinations.\n");
        newsletterContent.append("Hurry, limited seats available!\n\n");
        newsletterContent.append("Happy Travels,\n");
        newsletterContent.append(companyName + " Team");

        return newsletterContent.toString();
    }

    public String generateMonthlyNewsletter() {
        String companyName = "SkyByte Airlines";
        String currentMonth = "December";

        StringBuilder newsletterContent = new StringBuilder();
        newsletterContent.append("Dear Valued Customer,\n\n");
        newsletterContent.append("We're excited to present exclusive offers from " + companyName + " for " + currentMonth + "!\n\n");
        newsletterContent.append("Enjoy amazing discounts on select destinations.\n");
        newsletterContent.append("Hurry, limited seats available!\n\n");
        newsletterContent.append("Happy Travels,\n");
        newsletterContent.append(companyName + " Team");

        return newsletterContent.toString();
    }
}
