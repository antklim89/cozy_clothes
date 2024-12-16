import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { contactsLoader } from '@/lib/contentLoaders';


export async function Contacts() {
  const contacts = await contactsLoader();

  return (
    <Card className="container prose flex flex-col lg:flex-row">
      <CardHeader className="flex-[1_1_0%]">
        <h2>Get In Touch</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardHeader>
      <CardContent className="flex-[2_1_0%] grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {contacts.map(
          ({
            email,
            id,
            phone,
            title,
            hidden,
          }) =>
            !hidden && (
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
            ),
        )}
      </CardContent>
    </Card>
  );
}
