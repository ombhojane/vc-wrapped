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
