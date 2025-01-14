export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  data: {
    Tables: {
      hotel: {
        Row: {
          id: string
          name: string | null
          userId: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          userId?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      client: {
        Row: {
          dateIn: string | null
          dateOut: string | null
          dni: number | null
          id: string
          lastname: string | null
          name: string | null
          paid: boolean | null
          phone: number | null
          price: number | null
          roomId: string | null
          user_id: string | null
        }
        Insert: {
          dateIn?: string | null
          dateOut?: string | null
          dni?: number | null
          id?: string
          lastname?: string | null
          name?: string | null
          paid?: boolean | null
          phone?: number | null
          price?: number | null
          roomId?: string | null
          user_id?: string | null
        }
        Update: {
          dateIn?: string | null
          dateOut?: string | null
          dni?: number | null
          id?: string
          lastname?: string | null
          name?: string | null
          paid?: boolean | null
          phone?: number | null
          price?: number | null
          roomId?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_roomId_fkey"
            columns: ["roomId"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      floor: {
        Row: {
          id: string
          number: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          number?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          number?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "floor_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      room: {
        Row: {
          available: boolean | null
          floorId: string | null
          id: string
          number: number | null
          typeId: string | null
          user_id: string | null
        }
        Insert: {
          available?: boolean | null
          floorId?: string | null
          id?: string
          number?: number | null
          typeId?: string | null
          user_id?: string | null
        }
        Update: {
          available?: boolean | null
          floorId?: string | null
          id?: string
          number?: number | null
          typeId?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_floorId_fkey"
            columns: ["floorId"]
            isOneToOne: false
            referencedRelation: "floor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_typeId_fkey"
            columns: ["typeId"]
            isOneToOne: false
            referencedRelation: "typeroom"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      typeroom: {
        Row: {
          id: string
          name: string | null
          price: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          price?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "typeroom_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id?: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
