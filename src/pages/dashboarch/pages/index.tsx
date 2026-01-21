import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";

const mapMarkers = [
  {
    id: 1,
    position: [10.8231, 106.6297],
    color: "#1d9bf0",
    status: "active",
    label: "B1 - Q1",
  },
  {
    id: 2,
    position: [10.786, 106.695],
    color: "#1fb6ff",
    status: "active",
    label: "B3 - Q3",
  },
  {
    id: 3,
    position: [10.852, 106.77],
    color: "#ff5252",
    status: "alert",
    label: "B5 - Thủ Đức",
  },
  {
    id: 4,
    position: [10.76, 106.66],
    color: "#00c2a8",
    status: "active",
    label: "B7 - Q5",
  },
  {
    id: 5,
    position: [10.74, 106.73],
    color: "#ffc400",
    status: "warning",
    label: "B9 - Bình Thạnh",
  },
];

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const wmsUrl =
  import.meta.env.VITE_GEOSERVER_WMS_URL ??
  "https://ahocevar.com/geoserver/wms";
const wmsLayer = import.meta.env.VITE_GEOSERVER_LAYER ?? "topp:states";
const mapCenter: [number, number] = [10.82, 106.7];

const rainData = [40, 52, 65, 72, 80, 86, 95, 78, 72];
const barData = [12, 18, 24, 32, 28, 22, 18, 24, 30, 34, 28, 26];

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="relative overflow-hidden rounded-xl border border-white/60 bg-slate-900 shadow-inner">
          <MapContainer
            center={mapCenter}
            zoom={12}
            className="h-[420px] w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <WMSTileLayer
              url={wmsUrl}
              layers={wmsLayer}
              format="image/png"
              transparent
              version="1.1.1"
            />
            {mapMarkers.map((marker) => (
              <CircleMarker
                key={marker.id}
                center={marker.position as [number, number]}
                radius={12}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: marker.color,
                  fillOpacity: 0.85,
                }}
              >
                <Popup>
                  <div className="text-sm font-semibold">{marker.label}</div>
                  <div className="text-xs text-slate-600">
                    {marker.status === "alert"
                      ? "Đang cảnh báo"
                      : marker.status === "warning"
                      ? "Cảnh báo nhẹ"
                      : "Hoạt động ổn định"}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
          <div className="absolute right-4 top-4 rounded-lg bg-white/95 px-4 py-3 text-sm font-semibold text-amber-600 shadow-lg">
            <div className="text-[13px] text-slate-500">Cảnh báo</div>
            <div>Trạm B5 - Thủ Đức vượt ngưỡng!</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white px-4 py-4 shadow-md">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Tổng số trạm
              </div>
              <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-800">
                15
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Kết nối 5 bình
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-white px-4 py-4 shadow-md">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Cảnh báo
              </div>
              <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-amber-500">
                Nhẹ
                <span className="h-3 w-3 rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="rounded-xl bg-white px-4 py-4 shadow-md">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Điểm ngập
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">3</div>
            </div>
            <div className="rounded-xl bg-white px-4 py-4 shadow-md">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Lượng mưa TB (thời)
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">5mm</div>
            </div>
          </div>

          <div className="rounded-xl bg-white px-5 py-4 shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-700">
                  Mực nước 24h qua
                </div>
                <div className="text-xs text-slate-500">So sánh lượng mưa</div>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Mực nước
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-900" />
                  Lượng mưa
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 flex h-32 items-end gap-1">
                {rainData.map((value, index) => (
                  <div key={index} className="flex flex-1 items-end gap-1">
                    <div
                      className="w-full rounded-t-lg bg-linear-to-t from-sky-300 to-sky-500"
                      style={{ height: `${Math.max(8, value / 1.2)}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-12 flex h-28 items-end gap-1">
                {barData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-lg bg-blue-900"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
