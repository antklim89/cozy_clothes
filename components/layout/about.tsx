import aboutImage from '@/public/about_image.jpg';
import Image from 'next/image';

export const About = () => {
  return (
    <section className="prose container my-8">
      <h1>About Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consectetur odit est neque voluptas, cum
        dolorum ut libero, at, dignissimos provident ea cumque incidunt molestiae velit. Dolore officiis corrupti
        quaerat dicta obcaecati ea, nisi dignissimos inventore. Totam, assumenda ab. Fuga, vero repudiandae quam id in
        sunt consequuntur. Accusantium aut iste expedita sapiente ipsum error ab eligendi molestiae, natus totam
        assumenda possimus aliquam voluptates asperiores impedit atque consequatur temporibus qui at minima! Excepturi
        iusto perspiciatis quo nostrum rem nisi natus quidem, harum voluptatum non voluptates, delectus aliquam pariatur
        placeat dolor nulla officiis impedit. Voluptatem, dicta excepturi incidunt atque delectus dolore quisquam iste,
        expedita vel tempora nobis porro inventore ipsa, alias debitis at. Eveniet quo excepturi odio accusamus ducimus
        sequi ea deleniti quia cum eum ullam, vitae ipsam sed nihil eaque enim id perspiciatis.
      </p>
      <p>
        Eligendi quod, placeat consequuntur iste voluptatum in quibusdam, culpa laboriosam adipisci cumque voluptate
        dolores aliquid praesentium nesciunt qui suscipit assumenda debitis, magni eveniet recusandae veniam aliquam
        eos. Laborum pariatur deleniti ut vitae ab facere odit tempora, in sed, sint sunt, dignissimos illum
        perspiciatis quos accusamus quae. Tenetur eaque laudantium quo cumque fuga rerum quis doloremque consequuntur
        impedit sapiente consequatur eveniet, atque ad minus, magni nulla, ipsa autem sint obcaecati voluptatem. Nulla
        laudantium officia odio corrupti harum id nostrum corporis ut fugit, dolores vero impedit, enim saepe. Atque
        officiis impedit non, nesciunt quia officia laboriosam nihil quae totam praesentium deserunt reiciendis repellat
        voluptatem, dolore voluptatibus, consectetur sint necessitatibus autem.
      </p>
      <p>
        Laborum voluptates voluptatum rem fugit fugiat cupiditate, nemo obcaecati possimus, quos, corrupti deleniti
        impedit ullam. Eveniet, molestias. Pariatur, consequuntur, maiores officia sapiente consequatur rerum doloribus
        assumenda minima voluptatum ipsa ullam harum laudantium sed natus repellendus sequi! Fugiat autem expedita,
        culpa excepturi earum itaque quod voluptatibus dolorum eligendi dolores eaque, aliquid magnam soluta accusamus
        corrupti illo fuga optio officiis minima voluptate id praesentium dolor ullam sit! Iusto illum sed dolor tempore
        veritatis doloremque magni, accusantium optio blanditiis aspernatur facilis harum possimus ipsam ducimus? Nam
        assumenda delectus eveniet hic possimus praesentium pariatur facilis magni minima autem aliquam aut odio,
        dolorem officia voluptatum, ipsa totam explicabo. Sequi libero dignissimos minus molestias asperiores
        laudantium, assumenda recusandae corporis at dolore temporibus. Repudiandae quidem illum cupiditate suscipit
        error hic numquam, in harum quibusdam neque architecto impedit. Quo nisi quibusdam doloribus hic voluptate
        quidem natus exercitationem asperiores necessitatibus. Similique animi, hic tempora quae non minima ducimus
        aliquid voluptate veniam sed pariatur vitae placeat obcaecati, ipsum nemo ea porro, cum at recusandae.
      </p>

      <Image
        alt="About"
        src={aboutImage}
        className="w-full h-80 object-cover object-center rounded-3xl"
        placeholder="blur"
      />

      <h2>Our values</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam porro alias aliquam aperiam reiciendis quam
        dolorum impedit quasi cum. Illum repellat minus libero? Dignissimos eaque perspiciatis iure eligendi natus.
        Impedit, saepe recusandae quia voluptatem alias beatae perspiciatis voluptates aliquid delectus voluptatum,
        quisquam pariatur eius. Id quisquam rem voluptas saepe omnis.
      </p>
      <div className="grid gap-0 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <section>
          <h4>Be world-class</h4>
          <p>
            Et recusandae quibusdam unde qui, obcaecati fugiat, atque in consequatur laboriosam illum hic amet inventore
            aliquid corporis impedit cum officiis reprehenderit assumenda! Deleniti distinctio aut praesentium nostrum
            neque, et nisi porro tempora quis perspiciatis adipisci impedit possimus rem, maxime similique facilis
            voluptatem.
          </p>
        </section>
        <section>
          <h4>Share everything you know</h4>
          <p>
            Necessitatibus similique impedit sunt nisi, quos ratione quae numquam repellendus natus! Inventore illo iure
            cupiditate nihil? Velit accusamus corrupti labore amet provident, enim ea hic corporis saepe deserunt non
            facere sint!
          </p>
        </section>
        <section>
          <h4>Take responsibility</h4>
          <p>
            Eum obcaecati aperiam dolor iusto facere molestias ex nesciunt, minima doloremque porro veritatis! Ab,
            exercitationem. Minus magnam laudantium dignissimos nam, praesentium distinctio odit doloremque rerum quis
            perferendis eligendi eum corporis eveniet, voluptate quidem commodi unde ratione perspiciatis nisi quasi
            sequi iusto, a vitae nobis?
          </p>
        </section>
        <section>
          <h4>Be supportive</h4>
          <p>
            Alias sequi excepturi commodi sint minima earum beatae quo libero ducimus accusantium ipsum tenetur, ullam
            in deleniti magni ex atque facilis exercitationem accusamus architecto culpa repudiandae quos. Rerum sint
            expedita a eaque quaerat magni?
          </p>
        </section>
        <section>
          <h4>Be supportive</h4>
          <p>
            Minus molestias nisi sequi? Sint, doloremque. Error nisi qui dolor officia libero, recusandae porro cum
            totam quibusdam, est corrupti eum voluptate ad id omnis culpa eaque et! Nesciunt accusantium iusto soluta in
            ipsum, ad rem enim quisquam cupiditate labore officia, impedit quidem.
          </p>
        </section>
        <section>
          <h4>Keep track of the quality</h4>
          <p>
            Ipsam vero delectus quo cum impedit. Nesciunt nihil quidem consectetur reprehenderit atque aliquid maiores
            tempora dolores neque soluta voluptatem corporis dolorum eaque exercitationem libero minus sapiente,
            officiis quis sint cupiditate itaque maxime sunt praesentium voluptatibus!
          </p>
        </section>
      </div>
    </section>
  );
};
