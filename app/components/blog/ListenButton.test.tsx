import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListenButton from './ListenButton';
import { vi } from 'vitest';

describe('ListenButton', () => {
	beforeEach(() => {
		// Ensure a clean global state for each test
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete window.speechSynthesis;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete window.SpeechSynthesisUtterance;
		vi.restoreAllMocks();
	});

	test('does not render when speechSynthesis is unsupported', () => {
		// Ensure speechSynthesis is undefined
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		delete window.speechSynthesis;
		render(<ListenButton text='hello world' />);
		expect(screen.queryByRole('button')).toBeNull();
	});

	test('renders and starts/stops speaking', async () => {
		const mockCancel = vi.fn();
		const mockSpeak = vi.fn((utt: any) => {
			// Signal start synchronously
			utt.onstart?.();
			// End after a short delay to simulate async speech
			setTimeout(() => {
				utt.onend?.();
			}, 10);
		});

		const voices = [{ name: 'Google US English', lang: 'en-US' }];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.speechSynthesis = {
			getVoices: () => voices,
			speak: mockSpeak,
			cancel: mockCancel,
		} as any;

		// Minimal fake constructor for SpeechSynthesisUtterance
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.SpeechSynthesisUtterance = function (text: string) {
			this.text = text;
			this.voice = undefined;
			this.pitch = undefined;
			this.onstart = undefined;
			this.onend = undefined;
			this.onerror = undefined;
		} as any;

		render(<ListenButton text='hello world' />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-pressed', 'false');

		// Click to start speaking
		fireEvent.click(button);
		expect(mockSpeak).toHaveBeenCalled();
		// onstart is called synchronously in our mock, so the button should reflect speaking
		expect(button).toHaveAttribute('aria-pressed', 'true');

		// Clicking while speaking should cancel
		fireEvent.click(button);
		expect(mockCancel).toHaveBeenCalled();

		// Wait for the utterance to end and state to update
		await waitFor(() =>
			expect(button).toHaveAttribute('aria-pressed', 'false')
		);
	});

	test('selects a preferred voice when available', () => {
		const mockCancel = vi.fn();
		const mockSpeak = vi.fn((utt: any) => {
			// Immediately start and end to keep test synchronous
			utt.onstart?.();
			utt.onend?.();
		});

		const voices = [
			{ name: 'Some Voice', lang: 'en-GB' },
			{ name: 'Google US English', lang: 'en-US' },
		];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.speechSynthesis = {
			getVoices: () => voices,
			speak: mockSpeak,
			cancel: mockCancel,
		} as any;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.SpeechSynthesisUtterance = function (text: string) {
			this.text = text;
			this.voice = undefined;
			this.pitch = undefined;
			this.onstart = undefined;
			this.onend = undefined;
		} as any;

		render(<ListenButton text='choose voice' />);
		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockSpeak).toHaveBeenCalled();
		const utt = mockSpeak.mock.calls[0][0];
		expect(utt.voice).toBeTruthy();
		// Preferred voice should be an en-US variant
		expect(/en-?us/i.test(utt.voice.lang || utt.voice.name || '')).toBeTruthy();
	});
});
