import { fireEvent } from '@testing-library/react';

const focusableSelector =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const isElementDisabled = (element: HTMLElement) => {
  if ('disabled' in element && typeof element.disabled === 'boolean') {
    return (element as HTMLButtonElement | HTMLInputElement).disabled;
  }

  const ariaDisabled = element.getAttribute('aria-disabled');
  return ariaDisabled === 'true';
};

const getFocusableElements = () =>
  Array.from(document.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) =>
      !isElementDisabled(element) &&
      element.tabIndex !== -1 &&
      element.getAttribute('hidden') === null,
  );

const focusElement = (element: HTMLElement | undefined) => {
  if (!element) return;
  element.focus();
};

export const createUserEvent = () => {
  const tab = () => {
    const focusables = getFocusableElements();
    if (focusables.length === 0) return;

    const active = document.activeElement as HTMLElement | null;
    const currentIndex = active ? focusables.indexOf(active) : -1;
    const next = focusables[(currentIndex + 1) % focusables.length];
    focusElement(next);
  };

  const type = (element: HTMLElement, text: string) => {
    const target = element as HTMLInputElement | HTMLTextAreaElement;
    const currentValue = target.value ?? '';
    const nextValue = `${currentValue}${text}`;
    fireEvent.change(target, { target: { value: nextValue } });
  };

  const keyboard = (input: string) => {
    const active = document.activeElement as HTMLElement | null;
    if (!active) return;

    if (input === '{Enter}') {
      fireEvent.keyDown(active, { key: 'Enter', code: 'Enter' });
      fireEvent.keyUp(active, { key: 'Enter', code: 'Enter' });

      if (active instanceof HTMLButtonElement) {
        fireEvent.click(active);
      } else if (
        active instanceof HTMLInputElement &&
        active.type === 'submit'
      ) {
        fireEvent.click(active);
      }
    }
  };

  return { tab, type, keyboard };
};
