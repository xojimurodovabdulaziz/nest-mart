const ITEMS = [
  {
    no: "01",
    title: "Yetkazib berish",
    text: "Buyurtmangiz qayerda ekanini bilmoqchimisiz? Yetkazib berish vaqtlari, hududlar va narxlar haqida shu yerdan so'rang.",
  },
  {
    no: "02",
    title: "Sotuvchi bilan hamkorlik",
    text: "Nest Mart'da do'kon ochmoqchimisiz? Ro'yxatdan o'tish shartlari va komissiya bo'yicha savollaringizga javob beramiz.",
  },
  {
    no: "03",
    title: "To'lov va buyurtmalar",
    text: "To'lov usullari, chek va qaytarish jarayoni bo'yicha savollaringiz bo'lsa, bemalol murojaat qiling.",
  },
  {
    no: "04",
    title: "Umumiy savollar",
    text: "Yuqoridagilarga to'g'ri kelmaydigan boshqa har qanday savol — jamoamiz 24 soat ichida javob beradi.",
  },
];

const ContactHelp = () => {
  return (
    <div className="contact-help">
      <div>
        <p className="contact-help-eyebrow">Sizga qanday yordam bera olamiz?</p>
        <h1>Savollaringiz bormi? Biz shu yerdamiz</h1>
        <p className="contact-help-intro">
          Buyurtma, yetkazib berish yoki hamkorlik bo'yicha savolingiz bo'lsa, pastdagi
          shakl orqali yozing yoki to'g'ridan-to'g'ri qo'ng'iroq qiling — jamoamiz tez
          orada javob beradi.
        </p>
      </div>

      <div className="contact-help-grid">
        {ITEMS.map((item) => (
          <div key={item.no} className="contact-help-item">
            <h4>
              {item.no}. {item.title}
            </h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactHelp;
