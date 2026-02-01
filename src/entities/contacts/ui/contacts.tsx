import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { ContactItem } from './contact-item';
import type { ContactType } from '../model/types';

export function Contacts({ contacts }: { contacts: ContactType[] }) {
  return (
    <Card className="container my-8 flex flex-col lg:flex-row">
      <CardHeader className="prose dark:prose-invert flex-[1_1_0%]">
        <h2>Get In Touch</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardHeader>
      <CardContent className="grid flex-[2_1_0%] grid-cols-1 gap-8 p-8 md:grid-cols-2">
        {contacts.map(contact => (
          <ContactItem contact={contact} key={contact.id} />
        ))}
      </CardContent>
    </Card>
  );
}
