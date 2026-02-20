import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TranscriptSection } from './index';

describe('TranscriptSection', () => {
    it('renders the transcript section title', () => {
        render(<TranscriptSection />);
        expect(screen.getByText('Transcript')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    it('displays the empty transcript placeholder', () => {
        render(<TranscriptSection />);
        expect(screen.getByText('Transcript will appear here after processing')).toBeInTheDocument();
    });
});
