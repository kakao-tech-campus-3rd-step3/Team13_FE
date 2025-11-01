export type RedirectFunction = (url: string) => void;

let redirectImpl: RedirectFunction = (url) => {
  window.location.assign(url);
};

export const redirectTo: RedirectFunction = (url) => {
  redirectImpl(url);
};

export const setRedirectImplementation = (fn: RedirectFunction) => {
  redirectImpl = fn;
};

export const resetRedirectImplementation = () => {
  redirectImpl = (url) => {
    window.location.assign(url);
  };
};
