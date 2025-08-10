import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { ContactItem } from './contact-item';
import type { ContactType } from '../model/types';


export async function Contacts({ contacts }: { contacts: ContactType[] }) {
  return (
    <Card className="container my-8 prose dark:prose-invert flex flex-col lg:flex-row">
      <CardHeader className="flex-[1_1_0%]">
        <h2>Get In Touch</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardHeader>
      <CardContent className="flex-[2_1_0%] grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {contacts.map(contact => <ContactItem contact={contact} key={contact.id} />)}
      </CardContent>
    </Card>
  );
}
