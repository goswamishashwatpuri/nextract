'use server';

import { auth } from '@clerk/nextjs/server';

import { getCreditsPack, PackId } from '@/types/billing';
import { redirect } from 'next/navigation';
import lemonSqueezyClient from '@/lib/axios';

export async function purchaseCredits(packId: PackId) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unautheticated');
  }

  const selectedPack = getCreditsPack(packId);
  if (!selectedPack) {
    throw new Error('Invalid pack');
  }

  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   invoice_creation: {
  //     enabled: true,
  //   },
  //   success_url: getAppUrl('billing'),
  //   cancel_url: getAppUrl('billing'),
  //   metadata: {
  //     userId,
  //     packId,
  //   },
  //   line_items: [
  //     {
  //       quantity: 1,
  //       price: selectedPack.priceId,
  //     },
  //   ],
  // });

  // create lemonsqueezy session like stripe session below


  // console.log("packVarientIds[packId] - ", packVarientIds[packId]);

  const res = await lemonSqueezyClient().post("/checkouts", {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          custom: {
            data: JSON.stringify({
              buyerUserId: userId,
              creditsToAdd: selectedPack.credits,
              amount: selectedPack.price
            })
          }
        },
        product_options: {
          "redirect_url": `${process.env.NEXT_PUBLIC_HOST_URL}/`,
        }
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: process.env.LEMON_SQUEEZY_STORE_ID, // User's store ID
          },
        },
        variant: {
          data: {
            type: "variants",
            id: selectedPack.lemonsqueezyVariantId, // User's product variant ID
          },
        },
      },
    },
  });

  // Get the checkout URL to send to the customer
  const checkoutUrl = res.data.data.attributes.url;
  if (!checkoutUrl) {
    throw new Error('Cannot create lemonsqueezy session');
  }

  redirect(checkoutUrl);
}
