import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Cozy Clothes',
    template: '&s | About',
  },
};

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default AboutPage;
