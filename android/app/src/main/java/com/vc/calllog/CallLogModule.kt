package com.vc.calllog

import android.content.Context
import android.database.Cursor
import android.provider.CallLog
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray

class CallLogModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "CallLogModule"

    @ReactMethod
    fun getCallLogs(limit: Int, promise: Promise) {
        try {
            val callLogs = fetchCallLogs(reactApplicationContext, limit)
            promise.resolve(callLogs)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    private fun fetchCallLogs(context: Context, limit: Int): WritableArray {
        val logs: WritableArray = Arguments.createArray()

        val projection = arrayOf(
            CallLog.Calls._ID,
            CallLog.Calls.NUMBER,
            CallLog.Calls.CACHED_NAME,
            CallLog.Calls.DURATION,
            CallLog.Calls.DATE,
            CallLog.Calls.TYPE
        )

        val sortOrder = "${CallLog.Calls.DATE} DESC"
        val selectionLimit = if (limit > 0) " LIMIT $limit" else ""

        try {
            val cursor: Cursor? = context.contentResolver.query(
                CallLog.Calls.CONTENT_URI,
                projection,
                null,
                null,
                sortOrder + selectionLimit
            )

            cursor?.use {
                val idIndex = it.getColumnIndex(CallLog.Calls._ID)
                val numberIndex = it.getColumnIndex(CallLog.Calls.NUMBER)
                val nameIndex = it.getColumnIndex(CallLog.Calls.CACHED_NAME)
                val durationIndex = it.getColumnIndex(CallLog.Calls.DURATION)
                val dateIndex = it.getColumnIndex(CallLog.Calls.DATE)
                val typeIndex = it.getColumnIndex(CallLog.Calls.TYPE)

                while (it.moveToNext()) {
                    val log = Arguments.createMap().apply {
                        putString("id", it.getString(idIndex) ?: "")
                        putString("phoneNumber", it.getString(numberIndex) ?: "")
                        putString("name", it.getString(nameIndex))
                        putInt("duration", it.getInt(durationIndex))
                        putDouble("timestamp", it.getLong(dateIndex).toDouble())
                        putString("type", getCallTypeString(it.getInt(typeIndex)))
                    }
                    logs.pushMap(log)
                }
            }
        } catch (e: SecurityException) {
            // Permission not granted
            throw Exception("Call log permission not granted")
        }

        return logs
    }

    private fun getCallTypeString(type: Int): String {
        return when (type) {
            CallLog.Calls.INCOMING_TYPE -> "INCOMING"
            CallLog.Calls.OUTGOING_TYPE -> "OUTGOING"
            CallLog.Calls.MISSED_TYPE -> "MISSED"
            CallLog.Calls.VOICEMAIL_TYPE -> "VOICEMAIL"
            CallLog.Calls.REJECTED_TYPE -> "REJECTED"
            CallLog.Calls.BLOCKED_TYPE -> "BLOCKED"
            else -> "UNKNOWN"
        }
    }
}
