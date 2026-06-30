import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { siteConfig } from '@/data/content';

export default function Contact() {
  return (
    <section id="contact" className="bg-burgundy text-pearl px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Reveal>
            <SectionLabel>Connect With Us</SectionLabel>
            <SectionHeading dark size="text-[1.9rem]">
              Seek and you shall find.
            </SectionHeading>
            <p className="text-pearl/75 font-body font-normal leading-relaxed mb-8">
              Whether you desire intercessory prayer, have questions about the Orthodox faith, or
              simply wish to join us for a service, our doors and hearts are open.
            </p>
            <div className="flex flex-col gap-5 text-sm">
              <div>
                <strong className="text-gold block font-serif text-[13px] mb-1">
                  Church Address
                </strong>
                <span className="text-pearl/75">{siteConfig.address}</span>
              </div>
              <div>
                <strong className="text-gold block font-serif text-[13px] mb-1">
                  General Enquiries
                </strong>
                <span className="text-pearl/75">{siteConfig.email}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              className="bg-pearl/[0.05] border border-pearl/15 rounded-curve-tl p-9 mb-7"
              action="#"
              method="POST"
            >
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-transparent border-0 border-b border-pearl/25 py-2.5 text-pearl text-sm placeholder:text-pearl/40 outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent border-0 border-b border-pearl/25 py-2.5 text-pearl text-sm placeholder:text-pearl/40 outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="How may we assist you?"
                    className="w-full bg-transparent border-0 border-b border-pearl/25 py-2.5 text-pearl text-sm placeholder:text-pearl/40 outline-none focus:border-gold resize-none font-body"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold text-burgundy-dark font-serif font-bold text-sm tracking-widest uppercase py-3.5 mt-1"
                >
                  Send Message
                </button>
              </div>
            </form>

            <div className="h-56 border border-pearl/15 overflow-hidden">
              <iframe
                title="Map showing St Basil Jacobite Syrian Orthodox Church Melbourne location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={siteConfig.mapEmbedSrc}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
