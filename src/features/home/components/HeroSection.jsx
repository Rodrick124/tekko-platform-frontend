import {
  BadgeCheck,
  Bolt,
  Camera,
  MapPin,
  Search,
  Snowflake,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import technicianImage from "../../../assets/images/servicelink-technician.jpg";
import { ROUTES } from "../../../constants/routes.js";
import mockProviders from "../../../data/mockProviders.js";
import ProvidersGrid from "../../providers/components/ProvidersGrid.jsx";

const SEARCH_RESULT_LIMIT = 10;
const normalize = (value = "") =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function HeroSection() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!service.trim() && !location) {
      setError("Saisissez un service ou choisissez une ville.");
      return;
    }
    const term = normalize(service.trim());
    const place = normalize(location);
    const matches = mockProviders.filter((provider) => {
      const searchableText = normalize([
        provider.name,
        provider.category,
        provider.description,
        ...provider.services,
      ].join(" "));
      const locationText = normalize(`${provider.city} ${provider.district}`);
      return (!term || searchableText.includes(term)) &&
        (!place || locationText.includes(place));
    });
    setSearchResults(matches);
  };
  const viewAllResults = () => {
    const params = new URLSearchParams();
    if (service.trim()) params.set("service", service.trim());
    if (location) params.set("localisation", location);
    navigate(`${ROUTES.providers}?${params}`);
  };
  return (
    <section className="relative overflow-hidden pb-16 pt-10 lg:py-16">
      <div className="absolute -right-20 -top-24 z-0 size-96 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl">
            Trouvez le bon prestataire,{" "}
            <span className="text-blue-600">près de chez vous.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Des professionnels qualifiés et vérifiés à Douala, Yaoundé et
            partout au Cameroun. Accédez directement à leur contact WhatsApp
            officiel sans barrières.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:col-span-5">
          <div className="absolute inset-0 rotate-2 scale-105 rounded-3xl bg-linear-to-tr from-blue-200 via-blue-100 to-emerald-200" />
          <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
            <img
              src={technicianImage}
              alt="Technicien qualifié Tekko au Cameroun"
              className="h-97.5 w-full rounded-2xl object-cover"
            />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-lg">
              <BadgeCheck className="text-emerald-700" />
              <span>
                <strong className="block text-sm">100% Vérifié</strong>
                <small className="text-emerald-700">Identités contrôlées</small>
              </span>
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-lg">
              <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-white">
                <Bolt size={18} />
              </span>
              <span>
                <strong className="block text-xs">Intervention rapide</strong>
                <small className="font-bold text-blue-700">
                  30 à 45 min chez vous
                </small>
              </span>
            </div>
          </div>
          <span className="absolute -left-4 top-1/2 hidden rounded-full bg-white p-3 text-blue-700 shadow-lg sm:block">
            <Snowflake size={20} />
          </span>
          <span className="absolute -right-4 top-1/4 hidden rounded-full bg-white p-3 text-emerald-700 shadow-lg sm:block">
            <Wrench size={20} />
          </span>
          <span className="absolute -right-3 bottom-1/4 hidden rounded-full bg-white p-3 text-amber-600 shadow-lg sm:block">
            <Camera size={20} />
          </span>
        </div>
      </div>
      <div className="px-4 pt-8 lg:px-21">
        <form
            onSubmit={submit}
            className="mt-7 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,.12)]"
            noValidate
          >
            <div className="grid gap-2 md:grid-cols-[1.2fr_1fr_auto]">
              <label className="flex items-center gap-3 rounded-xl px-3 py-2">
                <Search className="text-blue-600" size={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold text-slate-500">
                    Quel service ?
                  </span>
                  <input
                    id="search-input"
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value);
                      setError("");
                    }}
                    className="w-full border-0 bg-transparent text-sm outline-none"
                    placeholder="Électricien, Clim, Plombier..."
                  />
                </span>
              </label>
              <label className="flex items-center gap-3 border-slate-200 rounded-xl px-3 py-2 md:border-l">
                <MapPin className="text-emerald-700" size={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold text-slate-500">
                    Ville ou quartier
                  </span>
                  <select
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-transparent text-sm outline-none"
                  >
                    <option value="">Douala</option>
                    <option>Douala</option>
                    <option>Yaoundé</option>
                    <option>Bafoussam</option>
                    <option>Kribi</option>
                    <option>Limbe</option>
                  </select>
                </span>
              </label>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700"
                type="submit"
              >
                <Search size={18} />
                Rechercher
              </button>
            </div>
            {error && (
              <p role="alert" className="px-3 pb-1 pt-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Populaire :</span>
            {[
              "Électricité générale",
              "Dépannage clim",
              "Fuite d’eau",
              "Caméra surveillance",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setService(item)}
                className="rounded-full bg-white px-3 py-1.5 text-slate-600 shadow-sm hover:text-blue-700"
              >
                {item}
              </button>
            ))}
          </div>
          {searchResults && (
            <section className="mt-8" aria-live="polite">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Résultats de recherche
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    {searchResults.length} prestataire{searchResults.length === 1 ? "" : "s"} trouvé{searchResults.length === 1 ? "" : "s"}
                  </h2>
                </div>
                {searchResults.length > SEARCH_RESULT_LIMIT && (
                  <button
                    type="button"
                    onClick={viewAllResults}
                    className="text-left text-xs font-bold text-blue-700 hover:text-blue-900 sm:text-right"
                  >
                    Voir tous les résultats
                  </button>
                )}
              </div>
              {searchResults.length ? (
                <ProvidersGrid providers={searchResults.slice(0, SEARCH_RESULT_LIMIT)} />
              ) : (
                <div className="rounded-2xl bg-white p-6 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
                  Aucun prestataire ne correspond à votre recherche.
                </div>
              )}
            </section>
          )}
      </div>
    </section>
  );
}
export default HeroSection;
