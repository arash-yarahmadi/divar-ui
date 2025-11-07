const e2p = (s: string | number): string =>
  s.toString().replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

const p2e = (s: string | number): string =>
  s
    .toString()
    .replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const sp = (number: number): string => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return e2p(joinedNumber ?? "");
};

export { e2p, p2e, sp };
