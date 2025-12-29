// Save Wrapped Service - Captures and saves wrapped slides to gallery
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

// Request permission to save to gallery (Android only)
async function requestSavePermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
        return true;
    }

    try {
        // For Android 13+ (API 33+), no permission needed for saving to Pictures
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Save Photos Permission',
                message: 'VC Wrapped needs access to save your wrapped images to gallery.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED ||
            granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
    } catch (err) {
        console.warn('Permission error:', err);
        return true; // Try anyway for newer Android versions
    }
}

// Capture a single view as an image
export async function captureView(viewRef: React.RefObject<any>): Promise<string | null> {
    try {
        if (!viewRef.current) {
            return null;
        }
        const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 1,
        });
        return uri;
    } catch (error) {
        console.error('Error capturing view:', error);
        return null;
    }
}

// Save a captured image to the gallery
export async function saveToGallery(uri: string): Promise<boolean> {
    try {
        await CameraRoll.save(uri, { type: 'photo', album: 'VC Wrapped 2025' });
        return true;
    } catch (error) {
        console.error('Error saving to gallery:', error);
        return false;
    }
}

// Capture and save a single slide
export async function captureAndSaveSlide(
    viewRef: React.RefObject<any>,
    slideIndex: number
): Promise<boolean> {
    const uri = await captureView(viewRef);
    if (!uri) {
        console.error(`Failed to capture slide ${slideIndex}`);
        return false;
    }
    return await saveToGallery(uri);
}

// Main function to save all wrapped slides
export async function saveAllWrappedSlides(
    captureFunction: () => Promise<string[]>,
    onProgress?: (current: number, total: number) => void
): Promise<{ success: boolean; savedCount: number; totalCount: number }> {
    // Request permission first
    const hasPermission = await requestSavePermission();
    if (!hasPermission) {
        Alert.alert('Permission Denied', 'Unable to save images without storage permission.');
        return { success: false, savedCount: 0, totalCount: 0 };
    }

    try {
        // Get all slide URIs from the capture function
        const uris = await captureFunction();
        const totalCount = uris.length;
        let savedCount = 0;

        for (let i = 0; i < uris.length; i++) {
            const uri = uris[i];
            if (uri) {
                const saved = await saveToGallery(uri);
                if (saved) {
                    savedCount++;
                }
            }
            onProgress?.(i + 1, totalCount);
        }

        return { success: savedCount > 0, savedCount, totalCount };
    } catch (error) {
        console.error('Error saving wrapped slides:', error);
        return { success: false, savedCount: 0, totalCount: 0 };
    }
}
