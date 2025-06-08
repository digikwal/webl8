export interface WeblateProject {
  name: string;
  slug: string;
  web: string; // Human-viewable URL (vs. API url)
  url: string; // API endpoint URL
  id: number;
  components: string[]; // URIs to components
  repository?: string | null; // optional
  instructions?: string; // optional project instructions
}
