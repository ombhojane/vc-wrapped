// VC Wrapped - Apple-Style Theme System
// Light and Dark mode with Poppins font

// Font family configuration
export const fonts = {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
};

// Light Theme - Apple-style clean whites
export const lightTheme = {
    // Backgrounds
    background: '#FFFFFF',
    surface: '#F5F5F7',
    surfaceElevated: '#FFFFFF',

    // Accent - Apple Blue
    primary: '#007AFF',
    primaryLight: '#5AC8FA',

    // Text
    textPrimary: '#1D1D1F',
    textSecondary: '#6E6E73',
    textMuted: '#8E8E93',

    // Status
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    // Border
    border: '#E5E5EA',

    // Special
    cardBackground: '#FFFFFF',
    tabBar: '#FFFFFF',
    statusBarStyle: 'dark-content' as const,
};

// Dark Theme - Apple-style pure blacks
export const darkTheme = {
    // Backgrounds
    background: '#000000',
    surface: '#1C1C1E',
    surfaceElevated: '#2C2C2E',

    // Accent - Apple Blue (dark mode variant)
    primary: '#0A84FF',
    primaryLight: '#64D2FF',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textMuted: '#8E8E93',

    // Status
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',

    // Border
    border: '#38383A',

    // Special
    cardBackground: '#1C1C1E',
    tabBar: '#1C1C1E',
    statusBarStyle: 'light-content' as const,
};

// Theme type
export type ThemeColors = typeof lightTheme;

// Default to dark theme for now (will be dynamic later)
export const colors = darkTheme;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const typography = {
    hero: {
        fontSize: 48,
        fontWeight: '700' as const,
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    h1: {
        fontSize: 32,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    h2: {
        fontSize: 24,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        fontFamily: fonts.regular,
        color: colors.textPrimary,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        fontFamily: fonts.regular,
        color: colors.textSecondary,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        fontFamily: fonts.regular,
        color: colors.textMuted,
    },
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

// Card styles with glassmorphism
export const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
};

// Shadow for elevated surfaces
export const shadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
};

// Glassmorphism effect for Wrapped cards
export const glassEffect = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
};

// =====================================================
// WRAPPED-SPECIFIC THEME (Premium Dark Mode)
// =====================================================

// Wrapped color palette - Chocolatey/Warm Pastel Theme
export const wrappedColors = {
    // Core colors - Warm brown/tan palette
    primary: '#8B6914',        // Warm golden brown
    primaryLight: '#C4956A',   // Soft tan
    background: '#1A1510',     // Deep warm brown-black
    surface: '#2D261E',        // Warm brown surface

    // Secondary accents - Soft pastels from designs
    teal: '#7FBFB5',           // Soft sage/teal
    violet: '#B8A4C9',         // Soft lavender
    coral: '#E8A87C',          // Warm peach/coral
    indigo: '#8B7355',         // Warm brown

    // Text - Cream/warm tones
    textPrimary: '#F5E6D3',    // Warm cream
    textSecondary: '#C9B8A0',  // Muted cream
    textMuted: '#8B7B6B',      // Brown muted

    // Progress bar
    progressActive: '#F5E6D3',
    progressInactive: 'rgba(245, 230, 211, 0.2)',

    // Glow effects - Warm golden
    primaryGlow: 'rgba(196, 149, 106, 0.3)',
    ambientGlow1: 'rgba(139, 105, 20, 0.2)',
    ambientGlow2: 'rgba(232, 168, 124, 0.15)',
};

// Wrapped typography
export const wrappedTypography = {
    hero: {
        fontSize: 96,
        fontWeight: '800' as const,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
    },
    headline: {
        fontSize: 32,
        fontWeight: '700' as const,
        fontFamily: fonts.bold,
        color: wrappedColors.textPrimary,
        letterSpacing: -0.5,
    },
    label: {
        fontSize: 12,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        color: wrappedColors.primary,
        textTransform: 'uppercase' as const,
        letterSpacing: 2,
    },
    body: {
        fontSize: 18,
        fontWeight: '500' as const,
        fontFamily: fonts.medium,
        color: wrappedColors.textSecondary,
        lineHeight: 28,
    },
    quote: {
        fontSize: 26,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        color: wrappedColors.textPrimary,
        fontStyle: 'italic' as const,
        lineHeight: 38,
    },
};

// Glassmorphism panel style for Wrapped
export const wrappedGlassPanel = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
};

// Wrapped story progress bar config
export const wrappedStoryConfig = {
    autoAdvanceMs: 12000, // 12 seconds per slide
    progressHeight: 4,
    progressGap: 6,
    totalSlides: 10,
};

// Wrapped slide gradient colors (vibrant)
export const wrappedGradients = [
    ['#667eea', '#764ba2'], // Purple blend
    ['#f093fb', '#f5576c'], // Pink blend
    ['#4facfe', '#00f2fe'], // Blue aqua
    ['#43e97b', '#38f9d7'], // Green teal
    ['#fa709a', '#fee140'], // Pink yellow
    ['#a8edea', '#fed6e3'], // Soft pastel
    ['#ff9a9e', '#fecfef'], // Soft pink
    ['#667eea', '#764ba2'], // Purple
    ['#f5af19', '#f12711'], // Orange red
];
