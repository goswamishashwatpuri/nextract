import { Suspense } from 'react';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import PeriodSelector from '@/app/(dashboard)/dashboard/_components/period-selector';
import StatsCard from '@/app/(dashboard)/dashboard/_components/stats-card';
import ExecutionStatusChart from '@/app/(dashboard)/dashboard/_components/execution-status-chart';
import CreditUsageChart from '@/app/(dashboard)/billing/_components/credit-usage-chart';

import { getPeriods } from '@/actions/analytics/get-periods';
import { getStatsCardsValues } from '@/actions/analytics/get-stats-cards-values';
import { getWorkflowExecutionStats } from '@/actions/analytics/get-workflow-execution-stats';
import { getCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period';
import { Period } from '@/types/analytics';

export default function HomePage({ searchParams }: { searchParams: { month?: string; year?: string } }) {
  const currentDate = new Date();
  const { month, year } = searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Overview
        </h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px] rounded-lg" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-8">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-xl" />}>
            <div className="animate-slide-up">
              <StatsExecutionStatus selectedPeriod={period} />
            </div>
          </Suspense>
          <Suspense fallback={<Skeleton className="w-full h-[300px] rounded-xl" />}>
            <div className="animate-slide-up [animation-delay:200ms]">
              <CreditsUsageInPeriod selectedPeriod={period} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const periods = await getPeriods();

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await getStatsCardsValues(selectedPeriod);

  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard title="Workflow executions" value={data.workflowExecutions} icon={CirclePlayIcon} />
      <StatsCard title="Phase executions" value={data.phaseExecutions} icon={WaypointsIcon} />
      <StatsCard title="Credits consumed" value={data.creditsConsumed} icon={CoinsIcon} />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px] rounded-xl" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await getWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatusChart data={data} />;
}

async function CreditsUsageInPeriod({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await getCreditsUsageInPeriod(selectedPeriod);

  return (
    <CreditUsageChart data={data} title="Daily credits spent" description="Daily credits consumed in selected period" />
  );
}
