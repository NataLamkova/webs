import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzGerU3jDIQrw34-vXYmlBrIS3M0NCyE6APFmb1XQdJ5D65NFLld-sf-G-cveFC77ayyQ/exec";

export default function WeddingInvitation() {
    const weddingDate = new Date("2026-05-29T11:40:00+06:00");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [formData, setFormData] = useState({
        name: "",
        attendance: "Да, буду",
        drinks: [],
        foodRestrictions: "",
        wishes: "",
    });
    const [formStatus, setFormStatus] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const diff = weddingDate.getTime() - new Date().getTime();
            if (diff <= 0) return;
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, []);

    const drinks = [
        "Вино",
        "Водка",
        "Шампанское",
        "Мартини",
        "Апероль",
        "Коньяк",
        "Виски",
        "Пиво 🍺",
        "Безалкогольные"
    ];

    const toggleDrink = (drink) => {
        setFormData((prev) => ({
            ...prev,
            drinks: prev.drinks.includes(drink)
                ? prev.drinks.filter((item) => item !== drink)
                : [...prev.drinks, drink],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus("Отправляем...");

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbzGerU3jDIQrw34-vXYmlBrIS3M0NCyE6APFmb1XQdJ5D65NFLld-sf-G-cveFC77ayyQ/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    wedding: "Наталья & Максим — 29 мая 2026",
                    submittedAt: new Date().toISOString(),
                }),
            });

            setFormStatus("Спасибо! Анкета отправлена 💌");
            setFormData({ name: "", attendance: "Да, буду", drinks: [], foodRestrictions: "", wishes: "" });
        } catch (error) {
            setFormStatus("Не удалось отправить. Проверьте webhook.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.bgBlobOne} />
            <div style={styles.bgBlobTwo} />
            <div style={styles.bgBlobThree} />

            <section style={styles.hero}>
                <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={styles.heroCard}>
                    <div style={styles.kicker}>Wedding invitation</div>
                    <h1 style={styles.title}>Наталья & Максим</h1>
                    <div style={styles.divider}><span />♡<span /></div>
                    <p style={styles.text}>С радостью приглашаем вас разделить с нами особенный день — день нашей свадьбы.</p>
                    <div style={styles.date}>29 мая 2026</div>

                    <div style={styles.timerGrid}>
                        {[
                            [timeLeft.days, "дней"],
                            [timeLeft.hours, "часов"],
                            [timeLeft.minutes, "минут"],
                            [timeLeft.seconds, "секунд"],
                        ].map(([value, label]) => (
                            <div key={label} style={styles.timerBox}>
                                <div style={styles.timerNumber}>{value}</div>
                                <div style={styles.timerLabel}>{label}</div>
                            </div>
                        ))}
                    </div>

                    <a href="#form" style={styles.mainButton}>Подтвердить присутствие</a>
                </motion.div>
            </section>
            <section style={styles.sectionSoft}>
                <h2 style={styles.sectionTitle}>Дата свадьбы</h2>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.calendarCard}
                >
                    <div style={styles.calendarHeader}>Май 2026</div>

                    <div style={styles.weekDays}>
                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div style={styles.calendarGrid}>
                        {["", "", "", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day, index) => (
                            <div
                                key={index}
                                style={day === 29 ? styles.selectedDay : styles.calendarDay}
                            >
                                {day}
                                {day === 29 && <span style={styles.heartMark}>♡</span>}
                            </div>
                        ))}
                    </div>

                    <div style={styles.calendarText}>
                        Пятница, 29 мая 2026
                    </div>
                </motion.div>
            </section>
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Детали торжества</h2>
                <div style={styles.cards}>
                    <motion.div whileHover={{ y: -5 }} style={styles.card}>
                        <div style={styles.icon}>◷</div>
                        <h3 style={styles.cardTitle}>ЗАГС</h3>
                        <p style={styles.cardText}>11:40</p>
                        <p style={styles.small}>Центральный ЗАГС, Омск</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} style={styles.card}>
                        <div style={styles.icon}>✦</div>
                        <h3 style={styles.cardTitle}>Банкет</h3>
                        <p style={styles.cardText}>Сбор гостей — 16:30</p>
                        <p style={styles.small}>Начало — 17:00</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} style={styles.card}>
                        <div style={styles.icon}>⌖</div>
                        <h3 style={styles.cardTitle}>Место</h3>
                        <p style={styles.cardText}>«Два Цезаря», зал 2</p>
                        <p style={styles.small}>г. Омск, ул. Декабристов, 37/59</p>
                    </motion.div>
                </div>
            </section>

            <section style={styles.sectionSoft}>
                <h2 style={styles.sectionTitle}>Программа дня</h2>
                <div style={styles.timeline}>
                    {[
                        ["11:40", "Регистрация брака — Центральный ЗАГС"],
                        ["16:30", "Сбор гостей — банкетный зал «Два Цезаря», зал 2"],
                        ["17:00", "Начало банкета"],
                        ["22:00", "Свадебный торт"],
                        ["23:00", "Танцы и завершение вечера"],
                    ].map(([time, text], index) => (
                        <motion.div key={time} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} style={styles.timelineItem}>
                            <strong style={styles.time}>{time}</strong>
                            <span>{text}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Локации</h2>
                <div style={styles.locationGrid}>
                    <div style={styles.locationCard}>
                        <iframe title="ЗАГС" src="https://maps.google.com/maps?q=Омск%20Иртышская%20набережная%209%20Центральный%20ЗАГС&t=&z=15&ie=UTF8&iwloc=&output=embed" style={styles.map} />
                        <div style={styles.locationContent}>
                            <h3 style={styles.cardTitle}>Центральный ЗАГС</h3>
                            <p style={styles.small}>г. Омск, Иртышская набережная, 9</p>
                            <div style={styles.buttonRow}>
                                <a style={styles.mapButton} href="https://2gis.ru/omsk/search/Центральный%20ЗАГС%20Иртышская%20набережная%209" target="_blank" rel="noreferrer">2ГИС</a>
                                <a style={styles.outlineButton} href="https://yandex.ru/maps/?text=Омск%20Иртышская%20набережная%209%20Центральный%20ЗАГС" target="_blank" rel="noreferrer">Яндекс</a>
                            </div>
                        </div>
                    </div>

                    <div style={styles.locationCard}>
                        <iframe title="Два Цезаря" src="https://maps.google.com/maps?q=Омск%20Декабристов%2037%2F59%20Два%20Цезаря&t=&z=15&ie=UTF8&iwloc=&output=embed" style={styles.map} />
                        <div style={styles.locationContent}>
                            <h3 style={styles.cardTitle}>«Два Цезаря», зал 2</h3>
                            <p style={styles.small}>г. Омск, ул. Декабристов, 37/59</p>
                            <div style={styles.buttonRow}>
                                <a style={styles.mapButton} href="https://2gis.ru/omsk/search/Два%20Цезаря%20Декабристов%2037%2F59" target="_blank" rel="noreferrer">2ГИС</a>
                                <a style={styles.outlineButton} href="https://yandex.ru/maps/?text=Омск%20Декабристов%2037%2F59%20Два%20Цезаря" target="_blank" rel="noreferrer">Яндекс</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="form" style={styles.formSection}>
                <motion.form initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} style={styles.formCard}>
                    <div style={styles.formHeader}>Анкета гостя</div>
                    <p style={styles.formSub}>Пожалуйста, подтвердите присутствие до 18 мая</p>

                    <label style={styles.label}>Ваше имя</label>
                    <input style={styles.input} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Введите имя" required />

                    <label style={styles.label}>Придёте ли вы?</label>
                    <select style={styles.input} value={formData.attendance} onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}>
                        <option>Да, буду</option>
                        <option>Не смогу</option>
                        <option>Пока не знаю</option>
                    </select>

                    <label style={styles.label}>Что будете пить?</label>
                    <div style={styles.drinkGrid}>
                        {drinks.map((drink) => (
                            <motion.button type="button" whileTap={{ scale: 0.94 }} key={drink} onClick={() => toggleDrink(drink)} style={formData.drinks.includes(drink) ? styles.drinkActive : styles.drink}>
                                {drink}
                            </motion.button>
                        ))}
                    </div>

                    <label style={styles.label}>Ограничения по еде</label>
                    <input style={styles.input} value={formData.foodRestrictions} onChange={(e) => setFormData({ ...formData, foodRestrictions: e.target.value })} placeholder="Например: не ем мясо" />

                    <label style={styles.label}>Пожелания</label>
                    <textarea style={styles.textarea} value={formData.wishes} onChange={(e) => setFormData({ ...formData, wishes: e.target.value })} placeholder="Ваш комментарий" />

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={styles.submit}>Отправить анкету</motion.button>
                    {formStatus && <div style={styles.status}>{formStatus}</div>}
                </motion.form>
            </section>
            <section style={styles.sectionSoft}>
                <h2 style={styles.sectionTitle}>Дополнительно</h2>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.contactCard}
                >
                    <p style={styles.contactText}>
                        В случае возникновения вопросов по свадьбе,
                        обращайтесь к невесте:
                    </p>

                    <div style={styles.contactButtons}>
                        <a href="tel:+79994702980" style={styles.callButton}>
                            Позвонить
                        </a>

                        <a
                            href="https://vk.com/lamkova_natalia"
                            target="_blank"
                            rel="noreferrer"
                            style={styles.vkButton}
                        >
                            Написать в VK
                        </a>
                    </div>
                </motion.div>
            </section>
            <footer style={styles.footer}>Наталья & Максим<br /><span>С любовью ждём вас на нашем празднике</span></footer>
        </div>
    );
}

const styles = {
    contactCard: {
        maxWidth: 520,
        margin: "0 auto",
        background: "rgba(255,255,255,0.85)",
        borderRadius: 36,
        padding: "30px 24px",
        boxShadow: "0 25px 70px rgba(170, 101, 123, 0.18)",
        border: "1px solid #fff",
        textAlign: "center",
    },

    contactText: {
        fontSize: 18,
        color: "#6c5550",
        marginBottom: 26,
        lineHeight: 1.5,
    },

    contactButtons: {
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        justifyContent: "center",
    },

    callButton: {
        flex: 1,
        minWidth: 160,
        textAlign: "center",
        background: "linear-gradient(135deg, #c8748b, #a95c72)",
        color: "white",
        padding: "14px 18px",
        borderRadius: 999,
        textDecoration: "none",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 12px 26px rgba(174, 91, 116, 0.25)",
    },

    vkButton: {
        flex: 1,
        minWidth: 160,
        textAlign: "center",
        border: "1px solid #b76479",
        color: "#a15a6b",
        padding: "14px 18px",
        borderRadius: 999,
        textDecoration: "none",
        fontFamily: "Arial, sans-serif",
        background: "#fff7f9",
    },
    calendarCard: {
        maxWidth: 520,
        margin: "0 auto",
        background: "rgba(255,255,255,0.82)",
        borderRadius: 36,
        padding: "30px 24px",
        boxShadow: "0 25px 70px rgba(170, 101, 123, 0.18)",
        border: "1px solid #fff",
        textAlign: "center",
    },

    calendarHeader: {
        fontSize: 36,
        color: "#7d4b56",
        marginBottom: 22,
    },

    weekDays: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 8,
        color: "#b76479",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        marginBottom: 10,
    },

    calendarGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 8,
    },

    calendarDay: {
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        color: "#6c5550",
        fontFamily: "Arial, sans-serif",
        fontSize: 16,
    },

    selectedDay: {
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #c8748b, #a95c72)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: 20,
        fontWeight: 600,
        boxShadow: "0 12px 28px rgba(174, 91, 116, 0.35)",
        position: "relative",
    },

    heartMark: {
        position: "absolute",
        bottom: -18,
        color: "#b76479",
        fontSize: 18,
    },

    calendarText: {
        marginTop: 30,
        color: "#9d5968",
        fontSize: 22,
    },
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7f2 0%, #ffeef5 38%, #f3ecff 100%)",
        color: "#4a3732",
        fontFamily: "Georgia, 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
    },
    bgBlobOne: { position: "fixed", width: 360, height: 360, borderRadius: "50%", background: "#ffd6e8", top: -120, left: -90, filter: "blur(10px)", opacity: 0.65, zIndex: 0 },
    bgBlobTwo: { position: "fixed", width: 420, height: 420, borderRadius: "50%", background: "#e9ddff", right: -120, top: 160, filter: "blur(12px)", opacity: 0.55, zIndex: 0 },
    bgBlobThree: { position: "fixed", width: 280, height: 280, borderRadius: "50%", background: "#ffe6bd", left: "45%", bottom: -120, filter: "blur(14px)", opacity: 0.5, zIndex: 0 },
    hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 18px", position: "relative", zIndex: 1 },
    heroCard: { width: "min(880px, 100%)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 42, padding: "58px 28px", textAlign: "center", boxShadow: "0 30px 90px rgba(170, 101, 123, 0.18)", backdropFilter: "blur(18px)" },
    kicker: { textTransform: "uppercase", letterSpacing: "0.32em", fontSize: 13, color: "#b77b8a", marginBottom: 18, fontFamily: "Arial, sans-serif" },
    title: { fontSize: "clamp(48px, 8vw, 92px)", lineHeight: 1, margin: 0, color: "#7d4b56", fontWeight: 400 },
    divider: { display: "flex", alignItems: "center", justifyContent: "center", gap: 14, color: "#c98796", margin: "28px 0", fontSize: 26 },
    text: { fontSize: "clamp(18px, 2.2vw, 25px)", lineHeight: 1.55, maxWidth: 680, margin: "0 auto", color: "#6c5550" },
    date: { marginTop: 25, fontSize: 34, color: "#a96070" },
    timerGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 560, margin: "34px auto" },
    timerBox: { background: "#fff8f9", borderRadius: 22, padding: "18px 10px", boxShadow: "0 12px 28px rgba(177, 112, 132, 0.12)" },
    timerNumber: { fontSize: 34, color: "#9d5968" },
    timerLabel: { fontFamily: "Arial, sans-serif", color: "#8a7470", fontSize: 13 },
    mainButton: { display: "inline-block", background: "linear-gradient(135deg, #c8748b, #a95c72)", color: "white", padding: "16px 30px", borderRadius: 999, textDecoration: "none", fontFamily: "Arial, sans-serif", boxShadow: "0 15px 30px rgba(174, 91, 116, 0.25)" },
    section: { padding: "50px 18px", position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" },
    sectionSoft: { padding: "80px 18px", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.38)" },
    sectionTitle: { textAlign: "center", color: "#7d4b56", fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 400, margin: "0 0 40px" },
    cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 },
    card: { background: "rgba(255,255,255,0.72)", borderRadius: 30, padding: 28, textAlign: "center", boxShadow: "0 18px 45px rgba(170, 101, 123, 0.13)", border: "1px solid #fff" },
    icon: { fontSize: 36, color: "#c8748b", marginBottom: 12 },
    cardTitle: { margin: "0 0 8px", fontSize: 25, color: "#7d4b56", fontWeight: 400 },
    cardText: { margin: 0, fontSize: 18, color: "#5f4c48" },
    small: { margin: "6px 0 0", fontSize: 15, color: "#806e68", fontFamily: "Arial, sans-serif" },
    timeline: { maxWidth: 780, margin: "0 auto", display: "grid", gap: 14 },
    timelineItem: { display: "flex", gap: 22, alignItems: "center", background: "rgba(255,255,255,0.75)", padding: 20, borderRadius: 24, boxShadow: "0 12px 30px rgba(170, 101, 123, 0.1)", fontSize: 18 },
    time: { color: "#a96070", minWidth: 72, fontSize: 24, fontWeight: 400 },
    locationGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
    locationCard: { background: "rgba(255,255,255,0.78)", borderRadius: 30, overflow: "hidden", boxShadow: "0 18px 45px rgba(170, 101, 123, 0.13)" },
    map: { width: "100%", height: 260, border: 0, display: "block" },
    locationContent: { padding: 24 },
    buttonRow: { display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" },
    mapButton: { flex: 1, textAlign: "center", background: "#b76479", color: "white", padding: "12px 16px", borderRadius: 999, textDecoration: "none", fontFamily: "Arial, sans-serif" },
    outlineButton: { flex: 1, textAlign: "center", border: "1px solid #b76479", color: "#a15a6b", padding: "12px 16px", borderRadius: 999, textDecoration: "none", fontFamily: "Arial, sans-serif", background: "#fff7f9" },
    formSection: { padding: "60px 18px", position: "relative", zIndex: 1 },
    formCard: { maxWidth: 720, margin: "0 auto", background: "rgba(255,255,255,0.82)", borderRadius: 36, padding: "38px 26px", boxShadow: "0 25px 70px rgba(170, 101, 123, 0.2)", border: "1px solid #fff" },
    formHeader: { textAlign: "center", color: "#7d4b56", fontSize: 42, marginBottom: 8 },
    formSub: { textAlign: "center", color: "#806e68", fontFamily: "Arial, sans-serif", marginBottom: 28 },
    label: { display: "block", margin: "16px 0 8px", color: "#6c5550", fontFamily: "Arial, sans-serif", fontSize: 14 },
    input: { width: "100%", boxSizing: "border-box", border: "1px solid #ead1d8", background: "#fffafb", borderRadius: 18, padding: "14px 16px", fontSize: 16, outline: "none", color: "#4a3732" },
    textarea: { width: "100%", boxSizing: "border-box", border: "1px solid #ead1d8", background: "#fffafb", borderRadius: 18, padding: "14px 16px", fontSize: 16, outline: "none", minHeight: 92, color: "#4a3732" },
    drinkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))", gap: 10 },
    drink: { border: "1px solid #ead1d8", background: "#fff7f9", color: "#75545a", padding: "12px 10px", borderRadius: 18, cursor: "pointer", fontSize: 15 },
    drinkActive: { border: "1px solid #b76479", background: "linear-gradient(135deg, #c8748b, #a95c72)", color: "white", padding: "12px 10px", borderRadius: 18, cursor: "pointer", fontSize: 15, boxShadow: "0 10px 24px rgba(184, 99, 121, 0.22)" },
    submit: { width: "100%", marginTop: 20, border: 0, background: "linear-gradient(135deg, #c8748b, #a95c72)", color: "white", padding: "16px 18px", borderRadius: 999, fontSize: 17, cursor: "pointer", boxShadow: "0 15px 32px rgba(174, 91, 116, 0.25)" },
    status: { textAlign: "center", marginTop: 16, color: "#9d5968", fontFamily: "Arial, sans-serif" },
    footer: { position: "relative", zIndex: 1, textAlign: "center", padding: "55px 18px", background: "#7d4b56", color: "#fff7f2", fontSize: 34 },
};
