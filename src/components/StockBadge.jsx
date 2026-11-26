import { getStockStatus, STATUS } from "../utils/constants.js";

const classMap = {
  [STATUS.IN]: "badge badge-in",
  [STATUS.LOW]: "badge badge-low",
  [STATUS.OUT]: "badge badge-out",
};

function StockBadge({ quantity }) {
  const status = getStockStatus(quantity);
  return (
    <span className={classMap[status]}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}

export default StockBadge;
