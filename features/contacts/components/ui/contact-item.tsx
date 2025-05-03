import type { ContactType } from '../../types';


export function ContactItem({ contact }: { contact: ContactType }) {
  const {
    email,
    id,
    phone,
    title,
  } = contact;
  return (
    <div className="bg-slate-200 rounded p-4" key={id}>
      <h3>{title}</h3>
      <p>
        <a className="font-bold text-blue-800" href="mailto:email">
          {email}
        </a>
        <br />
        <a className="italic text-blue-800" href="tel:phone">
          {phone}
        </a>
      </p>
    </div>
  );
}
