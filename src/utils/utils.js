export function handleAddressShow(address) {
    if (!address) return '';
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start} ... ${end}`;
}

export function clearLocalstorage() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('currentKey');
    localStorage.removeItem('walletCollects');
    localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME');
  }