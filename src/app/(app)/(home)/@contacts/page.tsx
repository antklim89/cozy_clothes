import { getContacts } from '@/entities/contacts/services/dal';
import { Contacts } from '@/entities/contacts/ui';

async function Page() {
  const { type, result: contacts } = await getContacts();
  if (type === 'error') return <p>Error</p>;

  return (
    <Contacts contacts={contacts} />
  );
}

export default Page;
