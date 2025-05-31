import React from 'react';

const tips = [
  {
    title: 'Prioritas Kebutuhan',
    desc: 'Banyak orang terjebak dalam pengeluaran impulsif karena tidak membedakan antara kebutuhan dan keinginan. Sebelum membeli sesuatu, tanyakan pada diri sendiri: Apakah ini benar-benar saya butuhkan? Dengan memprioritaskan kebutuhan pokok seperti makanan, pendidikan, dan kesehatan, kamu bisa menghindari pengeluaran yang tidak perlu dan lebih fokus dalam mencapai tujuan finansial jangka panjang.',
    icon: '/icons/plan.png',
  },
  {
    title: 'Mencatat Keuangan',
    desc: 'Mencatat pengeluaran secara rutin adalah langkah kecil yang berdampak besar. Dengan mengetahui ke mana uangmu pergi setiap harinya, kamu bisa lebih mudah mengevaluasi kebiasaan finansial dan menghindari pemborosan. Selain itu, pencatatan ini juga membantumu dalam menyusun anggaran yang lebih efektif, sehingga setiap pengeluaran dapat direncanakan dengan lebih baik.',
    icon: '/icons/budget.png',
  },
  {
    title: 'Menabung',
    desc: 'Menabung bukan hanya tentang menyisihkan uang, tetapi juga membangun kebiasaan disiplin dalam mengelola keuangan. Dengan memiliki tabungan, kamu akan lebih siap menghadapi situasi tak terduga seperti biaya darurat atau peluang investasi yang datang tiba-tiba. Mulailah dengan menyisihkan sebagian dari penghasilanmu secara rutin, walaupun jumlahnya kecil, karena kebiasaan ini akan sangat bermanfaat di masa depan.',
    icon: '/icons/saving.png',
  },
];

const TipsSection = () => {
  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Tips Hemat</h2>
      <div style={styles.cardsWrapper}>
        {tips.map((tip, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              flexDirection: index % 2 === 1 ? 'row-reverse' : 'row', // kiri-kanan bergantian
            }}
          >
            <div style={styles.cardText}>
              <h3 style={styles.cardTitle}>{tip.title}</h3>
              <p style={styles.cardDesc}>{tip.desc}</p>
            </div>
            <img src={tip.icon} alt={tip.title} style={styles.icon} />
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '100px auto',
    padding: '0 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#3b2ba5',
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px solid #b5a8d5',
    borderRadius: '80px',
    padding: '30px',
    paddingLeft: '80px',
    paddingRight: '80px',
    backgroundColor: '#f9f9f9',
    gap: '20px',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  cardText: {
    flex: '1',
    minWidth: '260px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '15px',
    color: '#333',
  },
  icon: {
    height: '140px',
    width: '140px',
  },
};

export default TipsSection;
