import Link from 'next/link';
import { SquareDashedMousePointer, Send, Sigma, Compass } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  fontSize?: string;
  iconSize?: number;
}

export default function Logo({
  fontSize = 'text-2xl',
  iconSize = 23
}: Props) {

  
  return (
    <Link href="/" className={cn('text-2xl font-bold flex items-center gap-2', fontSize)}>
      <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-2">
        <Compass size={iconSize} className="stroke-white dark:dark:text-stone-300" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ne</span>
        <span className="text-stone-700 dark:text-stone-300 text-[1.2em] font-medium">x</span>
        <span className="text-stone-700 dark:text-stone-300">tract</span>
      </div>
    </Link>
  );
}
