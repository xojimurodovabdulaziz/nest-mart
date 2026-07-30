import { useState, useEffect } from "react";
import { getVendorsList } from "../../api/vendors";
import Reviews from "./Reviews";
import "./ProductTabs.css";

interface Props {
  description: string;
  vendorId: string | null;
  productId: string;
  reviewsCount: number;
}

const TABS = ["Description", "Additional info", "Vendor", "Reviews"] as const;

const ProductTabs = ({ description, vendorId, productId, reviewsCount }: Props) => {
  const [active, setActive] = useState<(typeof TABS)[number]>("Description");
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    if (!vendorId || active !== "Vendor") return;
    getVendorsList()
      .then((res) => {
        const list = res?.data?.vendors || [];
        setVendor(list.find((v: any) => v.id === vendorId) || null);
      })
      .catch(() => setVendor(null));
  }, [vendorId, active]);

  return (
    <div className="product-tabs">
      <div className="tabs-nav">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${active === tab ? "active" : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab === "Reviews" ? `${tab} (${reviewsCount})` : tab}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {active === "Description" && <p className="tab-description">{description}</p>}

        {active === "Additional info" && (
          <p className="tab-placeholder">No additional information available.</p>
        )}

        {active === "Vendor" && (
          <div className="tab-vendor">
            {vendor ? (
              <>
                <p className="vendor-store-name">{vendor.store_name}</p>
                <p className="vendor-owner">Owner: {vendor.owner_name}</p>
              </>
            ) : (
              <p className="tab-placeholder">Sold directly by Nest Mart.</p>
            )}
          </div>
        )}

        {active === "Reviews" && <Reviews productId={productId} />}
      </div>
    </div>
  );
};

export default ProductTabs;
