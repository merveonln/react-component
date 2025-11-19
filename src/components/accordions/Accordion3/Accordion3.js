import React, { useState } from "react";
import "./style.css";

const accordionData = [
  {
    id: 1,
    title: "Beautiful Forest",
    image: "https://i0.wp.com/mediatrend.mediamarkt.com.tr/wp-content/uploads/2017/02/2017_subat_03.jpg?fit=696%2C446&ssl=1",
    description: "A serene view of the lush green forest.",
  },
  {
    id: 2,
    title: "Calm Beach",
    image: "https://i0.wp.com/mediatrend.mediamarkt.com.tr/wp-content/uploads/2017/02/2017_subat_03.jpg?fit=696%2C446&ssl=1",
    description: "Feel the peace of the ocean waves.",
  },
  {
    id: 3,
    title: "Mountain Peaks",
    image: "https://i0.wp.com/mediatrend.mediamarkt.com.tr/wp-content/uploads/2017/02/2017_subat_03.jpg?fit=696%2C446&ssl=1",
    description: "Breathtaking mountain views to explore.",
  },
];

function Accordion3() {
  const [activeId, setActiveId] = useState(null);

  const handleAccordionClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="accordion-box">
        <div className="accordion-container">
        {accordionData.map((item) => (
            <div
            key={item.id}
            className={`accordion-item ${activeId === item.id ? "active" : ""}`}
            onClick={() => handleAccordionClick(item.id)}
            >
            <div
                className="accordion-image"
                style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="accordion-content">
                <h2>{item.title}</h2>
                {activeId === item.id && <p>{item.description}</p>}
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Accordion3;
