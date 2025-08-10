import { getContacts } from '@/src/entities/contacts/services/dal';
import { Contacts } from '@/src/entities/contacts/ui';

async function Page() {
  const { type, result: contacts } = await getContacts();
  if (type === 'error') return <p>Error</p>;

  return (
    <Contacts contacts={contacts} />
  );
}

export default Page;
