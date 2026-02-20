import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UploadSection } from './index';

describe('UploadSection', () => {
    it('renders the upload section title', () => {
        render(<UploadSection />);
        expect(screen.getByText('Upload Video')).toBeInTheDocument();
        expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('displays the upload instructions', () => {
        render(<UploadSection />);
        expect(screen.getByText('Click to upload')).toBeInTheDocument();
        expect(screen.getByText(/or drag and drop/i)).toBeInTheDocument();
        expect(screen.getByText('MP4, MOV, or AVI (max. 500MB)')).toBeInTheDocument();
    });

    it('displays the security and processing badges', () => {
        render(<UploadSection />);
        expect(screen.getByText('Secure')).toBeInTheDocument();
        expect(screen.getByText('Fast Processing')).toBeInTheDocument();
    });
});
