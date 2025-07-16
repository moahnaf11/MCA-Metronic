import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'; // adjust path as needed

export function VinCopyButton({ vin }: { vin: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 1000,
    onCopy: () => console.log('Copied VIN to clipboard!'),
  });

  return (
    <button
      onClick={() => copyToClipboard(vin)}
      className="hover:text-blue-600"
      title={isCopied ? 'Copied!' : 'Copy VIN'}
    >
      {isCopied ? (
        <Check className="size-4 text-green-600" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}
