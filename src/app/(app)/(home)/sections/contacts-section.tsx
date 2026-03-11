import { contactsCache, getContacts } from '@/entities/contacts/services';
import { Contacts } from '@/entities/contacts/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

export async function ContactsSection() {
  'use cache';
  contactsCache();

  const { result: contacts, error } = await getContacts();
  if (error) return <ErrorComponent error={error} />;

  return <Contacts contacts={contacts} />;
}
