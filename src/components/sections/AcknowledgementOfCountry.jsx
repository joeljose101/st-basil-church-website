import Reveal from '@/components/ui/Reveal';

export default function AcknowledgementOfCountry() {
  return (
    <section className="bg-pearl border-t border-sand px-6 py-16">
      <Reveal>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted font-body font-normal leading-relaxed italic">
            St. Basil Jacobite Syrian Orthodox Church respectfully acknowledges the Wurundjeri
            Woi-wurrung People of the Kulin Nation as the Traditional Custodians of the land on
            which we gather. We pay our respects to their Elders past and present and extend that
            respect to all Aboriginal and Torres Strait Islander peoples.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
