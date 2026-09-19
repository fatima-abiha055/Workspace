import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import WorkspaceCard from "../components/WorkspaceCard";
import FilterSidebar from "../components/FilterSidebar";
import workspaces from "../data/workspaces";
import meetingRooms from "../data/meetingRooms";

const ALL_SPACES = [...workspaces, ...meetingRooms];

export default function Workspaces({ favorites, onToggleFavorite }) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("location") ? "" : "");
  const [sort, setSort] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: searchParams.get("type") ? [searchParams.get("type")] : [],
    amenities: [],
    maxPrice: 50,
    minCapacity: 1,
    onlyAvailable: false,
  });

  const results = useMemo(() => {
    let list = ALL_SPACES.filter((w) => {
      if (query && !w.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.types.length && !filters.types.includes(w.type)) return false;
      if (w.price > filters.maxPrice) return false;
      if (w.capacity < filters.minCapacity) return false;
      if (filters.onlyAvailable && !w.available) return false;
      if (filters.amenities.length) {
        const has = filters.amenities.every((a) => w.amenities.includes(a));
        if (!has) return false;
      }
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, filters, sort]);

  return (
    <div className="page">
      <div className="page-header container">
        <div className="eyebrow">Discover</div>
        <h1>Explore Workspaces</h1>
        <p>Browse every desk, office and meeting room, then filter down to exactly what you need.</p>
      </div>

      <div className="container">
        <div className="flex-between flex-wrap" style={{ gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search workspace by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: 340 }}
          />
          <div className="flex" style={{ gap: 10 }}>
            <button className="btn btn-outline btn-sm show-mobile-filter" onClick={() => setShowFilters(true)}>
              Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 200 }}>
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="workspaces-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 28 }}>
          <div className="filter-desktop">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          <div>
            {results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No workspaces match your search</h3>
                <p>Try adjusting your filters or search term.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setQuery("");
                    setFilters({ types: [], amenities: [], maxPrice: 50, minCapacity: 1, onlyAvailable: false });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-3">
                {results.map((w) => (
                  <WorkspaceCard
                    key={w.id}
                    workspace={w}
                    isFavorite={favorites.includes(w.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="modal-overlay" onClick={() => setShowFilters(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 320, width: "100%" }}>
            <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
