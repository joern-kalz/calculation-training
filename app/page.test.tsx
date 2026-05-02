import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './page';

vi.mock('canvas-confetti');

let confettiMock: ReturnType<typeof vi.fn>;

async function loadConfettiMock() {
    const module = await import('canvas-confetti');
    confettiMock = vi.mocked(module.default);
}

function getQuestionText() {
    return screen.getByText(/\d+ \+ \? = \d+/).textContent || '';
}

function clickCorrectAnswer() {
    const text = getQuestionText();
    const [, current, target] = text.match(/(\d+) \+ \? = (\d+)/)!;
    const answer = Number(target) - Number(current);
    fireEvent.click(screen.getByRole('button', { name: `${answer}` }));
}

function startGame(target = 1) {
    fireEvent.click(screen.getByRole('button', { name: `${target}` }));
}

beforeEach(async () => {
    await loadConfettiMock();
    confettiMock.mockClear();
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
});

describe('Calculation Training integration', () => {
    it('starts a game, wins, and finishes', async () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1);

        render(<Home />);

        startGame(1);

        clickCorrectAnswer();
        clickCorrectAnswer();

        expect(await screen.findByText(/Congratulations/)).not.toBeNull();
        expect(confettiMock).toHaveBeenCalled();
        fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
        expect(await screen.findByText(/Select/)).not.toBeNull();
    });

    it('starts a game and answers incorrectly', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1);

        render(<Home />);

        startGame(1);

        const question = getQuestionText();
        const [, current] = question.match(/(\d+) \+ \? = (\d+)/)!;
        const wrongButton = screen.getByRole('button', { name: `${current}` });

        fireEvent.click(wrongButton);

        expect(wrongButton.className.split(' ')).toContain('shake');
        expect(screen.queryByText(/Congratulations/)).toBeNull();
        expect(screen.queryByText(/Game Over/)).toBeNull();
    });

    it('starts a game and loses after timeout', () => {
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockReturnValue(0.1);

        render(<Home />);

        startGame(1);

        for (let i = 0; i < 10; i += 1) {
            act(() => {
                vi.advanceTimersByTime(1000);
            });
        }

        expect(screen.getByText(/Game Over/)).not.toBeNull();
        expect(screen.getByRole('button', { name: 'Try Again' })).not.toBeNull();
    });
});
