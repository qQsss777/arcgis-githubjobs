export interface GitHubResult {
    id: string;
    type: string;
    url: string;
    created_at: Date;
    company: string;
    company_url: string;
    location: string;
    title: string;
    description: string;
    how_to_apply: string;
    company_logo: string;
}

export interface PropsJobList {
    jobs: GitHubResult[]
}

export interface PropsJob {
    job: GitHubResult
}

export interface PropsTri {
    onClose: (e: string) => void
    selectedValue: string;
    open: boolean
}

export interface AppProviderProps {
    children: JSX.Element[];
}

export interface ContextProps {
    state: AppReducer;
    dispatch: (a: any) => void;
}

export interface AppReducer {
    data: GitHubResult[];
    value: string;
}

export interface GeoJSON {
    type: string;
    features: Features[]
}

export interface Features {
    type: string;
    properties: any;
    geometry: GeometryPointJSON;
}

export interface GeometryPointJSON {
    type: string,
    coordinates: number[]
}