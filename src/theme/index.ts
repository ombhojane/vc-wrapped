// VC Wrapped - Dark Theme Design System
// Following Material Design dark theme guidelines

export const colors = {
    // Backgrounds
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceElevated: '#242424',

    // Accent
    primary: '#7C3AED',      // Violet
    primaryLight: '#A78BFA',

    // Text
    textPrimary: '#F5F5F5',
    textSecondary: '#A3A3A3',
    textMuted: '#6B7280',

    // Status
    success: '#10B981',      // Incoming calls
    warning: '#F59E0B',      // Outgoing calls
    error: '#EF4444',        // Missed calls

    // Border
    border: '#2D2D2D',
};

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
        color: colors.textPrimary,
    },
    h1: {
        fontSize: 32,
        fontWeight: '600' as const,
        color: colors.textPrimary,
    },
    h2: {
        fontSize: 24,
        fontWeight: '600' as const,
        color: colors.textPrimary,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: colors.textPrimary,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        color: colors.textPrimary,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        color: colors.textSecondary,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
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

// Card styles
export const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
};

// Shadow for elevated surfaces (subtle for dark theme)
export const shadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
};
