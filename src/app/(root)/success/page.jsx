import { Suspense } from 'react';
import SuccessContent from './components/success-content';

export const metadata = {
    title: 'Payment Successful - Leadio',
    description: 'Your payment was successful.',
};

export default function SuccessPage() {
    return (
        <div className="min-h-screen pt-28 sm:pt-36 pb-16 px-3 sm:px-4 flex items-center justify-center bg-neutral-50/50 dark:bg-zinc-950">
            <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
