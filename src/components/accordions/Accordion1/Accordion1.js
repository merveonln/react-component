import React, { useState } from "react";
import "./style.css";

const Accordion1 = () => {
  const [openIndex, setOpenIndex] = useState(null); // Hangi accordion açık?

  // Accordion verileri
  const accordionData = [
    {
      id: 1,
      title: "Accordion Başlığı 1",
      content: "Bu, birinci accordion içeriğidir. Daha fazla bilgi buraya eklenebilir.",
    },
    {
      id: 2,
      title: "Accordion Başlığı 2",
      content: "Bu, ikinci accordion içeriğidir. İçerik tamamen statiktir.",
    },
    {
      id: 3,
      title: "Accordion Başlığı 3",
      content: "Bu, üçüncü accordion içeriğidir. Açılıp kapanabilir bir yapıya sahiptir.",
    },
  ];

  // Accordion aç/kapa
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="one-accordion-container">
      {accordionData.map((item, index) => (
        <div className="one-accordion" key={item.id}>
          <div className={`one-accordion-header ${openIndex === index ? "open" : ""}`} onClick={() => toggleAccordion(index)}>
              <h3>{item.title}</h3>
              <div className="icon">{openIndex === index ? "x" : "-"}</div>
          </div>
          <div className={`one-accordion-content ${openIndex === index ? "open" : ""}`}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion1;
