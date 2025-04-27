import { Suspense } from 'react';
import { ArrowLeftRightIcon, CoinsIcon, CreditCard, History } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ReactCountUpWrapper from '@/components/react-count-up-wrapper';
import CreditsPurchase from '@/app/(dashboard)/billing/_components/credits-purchase';
import CreditUsageChart from '@/app/(dashboard)/billing/_components/credit-usage-chart';
// import InvoiceBtn from '@/app/(dashboard)/billing/_components/invoice-btn';

import { getAvailableCredits } from '@/actions/billing/get-available-credits';
import { getCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period';
import { getUserPurchaseHistory } from '@/actions/billing/get-user-purchase-history';
import { Period } from '@/types/analytics';

export default function BillingPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billing Dashboard</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CreditCard className="h-5 w-5" />
          <span>Manage your billing and credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
            <CreditUsageCard />
          </Suspense>
        </div>

        <div className="lg:col-span-2">
          <CreditsPurchase />
        </div>
      </div>

      <div className="mt-6">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <TransactionHistoryCard />
        </Suspense>
      </div>
    </div>
  );
}

async function CreditUsageCard() {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  const data = await getCreditsUsageInPeriod(period);
  const userBalance = await getAvailableCredits();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRightIcon className="h-5 w-5 text-primary" />
          Credit Usage
        </CardTitle>
        <CardDescription>Daily credit consumption in the current month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4 rounded-lg relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground">Available Credits</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-primary">
                <ReactCountUpWrapper value={userBalance} />
              </p>
              <span className="text-muted-foreground">credits</span>
            </div>
          </div>
          <CoinsIcon size={100} className="text-primary opacity-20 absolute bottom-0 right-0" />
        </div>
        <CreditUsageChart 
          data={data} 
          title="Credits consumed" 
          description="Daily credit consumed in the current month" 
        />
      </CardContent>
    </Card>
  );
}

async function TransactionHistoryCard() {
  const purchases = await getUserPurchaseHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>View your transaction history and download invoices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {purchases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet
          </div>
        ) : (
          <div className="divide-y">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center py-4">
                <div className="space-y-1">
                  <p className="font-medium">{formatDate(purchase.date)}</p>
                  <p className="text-sm text-muted-foreground">{purchase.description}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-medium">{formatAmount(purchase.amount, purchase.currency)}</p>
                  {/* <InvoiceBtn id={purchase.id} /> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}
