import { describe, it, expect } from 'vitest';
import { compareContractWithBenchmark } from '../services/ai/contractDiff';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

describe('Contract Comparator Diff Utility', () => {
  it('should generate structured variance items against benchmark template', () => {
    const doc = SAMPLE_DOCUMENTS[0]; // Freelance NDA
    const result = compareContractWithBenchmark(doc);

    expect(result.baseDocumentTitle).toBe(doc.title);
    expect(result.totalVariances).toBeGreaterThan(0);
    expect(result.items.some(i => i.severity === 'HIGH')).toBe(true);
  });
});
