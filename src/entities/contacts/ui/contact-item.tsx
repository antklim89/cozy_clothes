import type { ContactType } from '../model/types';

export function ContactItem({ contact }: { contact: ContactType }) {
  const { email, id, phone, title } = contact;
  return (
    <div className="rounded border border-accent p-4" key={id}>
      <h3>{title}</h3>
      <p>
        <a className="font-bold text-blue-800 dark:text-blue-400" href="mailto:email">
          {email}
        </a>
        <br />
        <a className="text-blue-800 italic dark:text-blue-400" href="tel:phone">
          {phone}
        </a>
      </p>
    </div>
  );
}
