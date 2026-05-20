export const calculateDiscount = (orignalPrice, discountPrice) => {
    const discount =
    discountPrice && orignalPrice
      ? Math.round(((orignalPrice - discountPrice) / orignalPrice) * 100)
      : null;

    return discount;
}