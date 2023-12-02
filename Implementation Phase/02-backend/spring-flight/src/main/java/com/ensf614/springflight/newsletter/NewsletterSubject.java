package com.ensf614.springflight.newsletter;

public interface NewsletterSubject {

        public void registerObserver(NewsletterObserver observer);

        public void removeObserver(NewsletterObserver observer);

        public void notifyObservers();
}
