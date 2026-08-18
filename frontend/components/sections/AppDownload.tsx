"use client";

import { FormEvent, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const APP_SCREENSHOT =
  "https://numforlife.com/wp-content/uploads/2025/06/download-2.svg";
const PLAY_BADGE =
  "https://numforlife.com/wp-content/uploads/2025/06/Google.png";
const STORE_BADGE =
  "https://numforlife.com/wp-content/uploads/2025/06/apple.avif";

export function AppDownload() {
  const [phone, setPhone] = useState("");
  const [smsOk, setSmsOk] = useState(false);

  function sendSms(event: FormEvent) {
    event.preventDefault();
    setSmsOk(true);
  }

  return (
    <section className="app-cta">
      <FadeIn type="fadeInLeft" className="app-cta-left">
        <img src={APP_SCREENSHOT} alt="数易赋能 App" width={256} height={440} />
      </FadeIn>
      <FadeIn type="fadeInRight" className="app-cta-right">
        <h2>Join us on mobile!</h2>
        <h3>Download the “数易赋能” app to easily stay updated on the go.</h3>
        <form className="app-form" onSubmit={sendSms}>
          <label htmlFor="phone-number">Phone number</label>
          <input
            id="phone-number"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Add your number"
          />
          <Button type="submit" className="btn-send">
            Send
          </Button>
          {smsOk ? <p className="form-ok">Sent.</p> : null}
        </form>
        <div className="app-stores">
          <svg className="qr" viewBox="0 0 80 80" aria-hidden>
            <rect width="80" height="80" fill="white" />
            <rect x="8" y="8" width="20" height="20" fill="black" />
            <rect x="52" y="8" width="20" height="20" fill="black" />
            <rect x="8" y="52" width="20" height="20" fill="black" />
            <rect x="32" y="32" width="8" height="8" fill="black" />
            <rect x="44" y="44" width="6" height="6" fill="black" />
            <rect x="56" y="56" width="10" height="10" fill="black" />
          </svg>
          <div className="store-badges">
            <a
              href="https://play.google.com/store/apps/details?id=com.wix.android&hl=en&gl=US"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PLAY_BADGE} alt="Google Play" width={144} height={43} />
            </a>
            <a
              href="https://apps.apple.com/us/app/spaces-follow-businesses/id1099748482"
              target="_blank"
              rel="noreferrer"
            >
              <img src={STORE_BADGE} alt="App Store" width={144} height={43} />
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
