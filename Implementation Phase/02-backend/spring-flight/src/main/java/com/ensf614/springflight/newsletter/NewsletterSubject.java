package com.ensf614.springflight.newsletter;

public interface NewsletterSubject {

        void attach(NewsletterObserver observer);

        void detach(NewsletterObserver observer);

        void notifySubscribers(String newsletterContent);
}
