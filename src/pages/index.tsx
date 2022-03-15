
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
// import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';

import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home( { product }: HomeProps ) {

//  console.log(props);

  return (
    <>
    <Head>
      <title>Home | ignews</title>
    </Head>    

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="girl coding" />
    </main>

    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

//  console.log('ok');
  const price = await stripe.prices.retrieve( 'price_1KalTvDqp0RHWSgPRLL4HDVr', {
    expand: ['product']
  } );

  const product = {
    priceId: price.id,
//    amount: ( price.unit_amount / 100 ),
    amount: new Intl.NumberFormat( 'en-US', {
      style: 'currency',
      currency: 'USD',
    } ).format( price.unit_amount / 100 ),
  };

  return {
    props: {
      nome: 'Luciana',
      product
    },
    revalidate: 60 * 60 * 24, //24 horas
  }

}
