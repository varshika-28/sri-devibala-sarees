/**
 * Sri Devibala Sarees - Customer Information & Form Validation
 * Following USER_PRD.md Section 14
 */

export function normalizePhoneNumber(input) {
  if (!input || typeof input !== 'string') return ''
  // Strip spaces, hyphens, parentheses, plus
  let cleaned = input.replace(/[\s\-\(\)\+]/g, '')
  
  // Remove leading +91 or 91 if the rest is 10 digits
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2)
  }
  // Remove leading 0 if 11 digits
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1)
  }
  return cleaned
}

export function validateCustomerForm({ name, phone, address, note }) {
  const errors = {}

  // Name validation: 2-60 characters, letters, spaces, dots, apostrophes
  const trimmedName = (name || '').trim()
  if (!trimmedName) {
    errors.name = 'Please enter your full name.'
  } else if (trimmedName.length < 2 || trimmedName.length > 60) {
    errors.name = 'Name must be between 2 and 60 characters.'
  } else if (!/^[a-zA-Z\s.']+$/.test(trimmedName)) {
    errors.name = 'Name can only contain letters, spaces, dots, and apostrophes.'
  }

  // Phone validation: Indian mobile starting with 6, 7, 8, or 9 and exactly 10 digits
  const normalizedPhone = normalizePhoneNumber(phone)
  if (!normalizedPhone) {
    errors.phone = 'Please enter your 10-digit mobile number.'
  } else if (normalizedPhone.length !== 10 || !/^[6-9][0-9]{9}$/.test(normalizedPhone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).'
  }

  // Address validation: 10-300 characters
  const trimmedAddress = (address || '').trim()
  if (!trimmedAddress) {
    errors.address = 'Please enter your delivery address.'
  } else if (trimmedAddress.length < 10) {
    errors.address = 'Please provide a complete address with street/locality (at least 10 characters).'
  } else if (trimmedAddress.length > 300) {
    errors.address = 'Address cannot exceed 300 characters.'
  }

  // Optional Note validation
  const trimmedNote = (note || '').trim()
  if (trimmedNote.length > 200) {
    errors.note = 'Note cannot exceed 200 characters.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: trimmedName,
      phone: normalizedPhone ? `+91 ${normalizedPhone}` : '',
      normalizedPhoneDigits: normalizedPhone,
      address: trimmedAddress,
      note: trimmedNote || 'None'
    }
  }
}
